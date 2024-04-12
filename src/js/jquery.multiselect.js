/**
 * A jQuery plugin multiselect with checkboxes
 * @author Gozoro <gozoro@yandex.ru>
 * @version 1.0.0
 */

;(function($)
{
	'use strict';

	if (typeof($) == 'undefined')
	{
		console.warn('Required jQuery.');
		return;
	}


	$.fn.multiselect = function(options)
	{
		options = $.extend({

			selectedText: 'Selected:',
			selectedTextMax: 3,
			caretClass: 'arrow'

		}, options);


		return this.each(function()
		{
			var mouseLock = false;
			var dropdownListVisible = false;
			var $realSelect = $(this);
			var $container = $('<div>').css('position', 'relative');
			var $selectInput = $('<input type="text" class="multiselect" readonly>')
			.change(function(){
				$selectInput.changeText();
			});


			var $dropdownList = $('<div class="multiselect-dropdownlist">');
			var selectName = $realSelect.prop('name');

			var $caret = $('<span class="multiselect-caret">')
			.addClass(options['caretClass'])
			.click(function()
			{
				$selectInput.focus();
				$dropdownList.show();
			});


			$realSelect.each(function()
			{
  				$.each(this.attributes, function(i, attrib)
				{
					if(attrib.name == 'class')
						$selectInput.addClass(attrib.value);
					else if(attrib.name != 'name')
						$selectInput.attr(attrib.name, attrib.value);
				});
			});


			$container.append($selectInput).append($caret).append($dropdownList);
			$realSelect.after($container).remove();

			function reposition()
			{
				var pos = $selectInput.position();

				$dropdownList.css({
					left: pos.left,
					top: pos.top + $selectInput.outerHeight(),
					width: $selectInput.outerWidth()
				});
			}

			window.addEventListener('resize', reposition);
			document.fonts.ready.then(reposition);

			reposition();



			$selectInput.click(function()
			{
				$dropdownList.show();
			});

			$dropdownList.show = function()
			{
				$.fn.show.apply(this, arguments);
				dropdownListVisible = true;
				$dropdownList.unselect().scrollTop(0).children().first().addClass('selected');
			}

			$dropdownList.hide = function()
			{
				$.fn.hide.apply(this, arguments);
				dropdownListVisible = false;
			}

			$selectInput.blur(function()
			{
				$dropdownList.hide();
			});

			$dropdownList.mouseout(function()
			{
				if (!mouseLock)
					$dropdownList.unselect();
			});

			$dropdownList.unselect = function()
			{
				this.find('.selected').removeClass('selected');
				return this;
			}

			$dropdownList.rowToggle = function(onlySet)
			{
				var $checkbox = $dropdownList.find('.selected input').first();

				if($checkbox.length)
				{
					if(onlySet)
					{
						if(!$checkbox.is(':checked'))
						{
							$checkbox.prop("checked", true);
							$selectInput.trigger('change');
						}
					}
					else
					{
						$checkbox.prop("checked", !$checkbox.is(':checked'));
						$selectInput.trigger('change');
					}
				}

				return this;
			}


			$selectInput.changeText = function()
			{
				var res = $dropdownList.find('input:checked');

				if(res.length <= options['selectedTextMax'])
				{
					var items = [];
					for(var i=0; i<res.length; i++)
					{
						items.push(res[i].nextSibling.nodeValue);
					}
					$selectInput.val(items.join(', '));
				}
				else
				{
					$selectInput.val( options['selectedText'] + ' ' + res.length );
				}
			}

			$dropdownList.addItem = function(itemValue, itemKey, checked)
			{
				var checkbox = $('<input type="checkbox">')
				.attr('name', selectName)
				.attr('value', itemValue)
				.prop('checked', checked)
				.click(function(event)
				{
					event.preventDefault();
				});


				var $row = $('<div>').addClass('multiselect-item')
					.append(checkbox)
					.append(itemKey)
					.mousedown(function(event)
					{
						$dropdownList.rowToggle(0);
						event.preventDefault();
					})
					.mouseover(function()
					{
						if (!mouseLock)
						{
							mouseLock = false;
							$dropdownList.unselect();
							$row.addClass('selected');
						}
					})
					.mousemove(function()
					{
						if (mouseLock)
						{
							mouseLock = false;
							$dropdownList.unselect();
							$row.addClass('selected');
						}
					});

				this.append($row);
			}

			$realSelect.find('option').each(function()
			{
				var item = $(this);
				$dropdownList.addItem(item.val(), item.html(), item.is(':selected'));
				$selectInput.changeText();
			});

			$selectInput.keydown(function(event)
			{
				switch (event.which)
				{
					case 38: pressUpArrow(event);   return;
					case 40: pressDownArrow(event); return;
					case 13: pressEnter(event);     return;
					case 27: pressEsc(event);       return;
					case 32: pressSpace(event); 	return;
				}
			});

			function pressEsc(event)
			{
				$dropdownList.hide();
			}

			function pressEnter(event)
			{
				event.preventDefault();

				if(dropdownListVisible)
					$dropdownList.rowToggle(1).hide();
				else
					$dropdownList.show();
			}

			function pressSpace(event)
			{
				event.preventDefault();
				$dropdownList.rowToggle(0);
			}

			function pressUpArrow(event)
			{
				if (dropdownListVisible)
				{
					event.preventDefault();
					mouseLock = true;
					var $selectedItem = $dropdownList.find('.selected').first();

					if ($selectedItem.length)
					{
						$dropdownList.unselect();

						var $prevItem = $selectedItem.prev();

						if ($prevItem.length)
						{
							var itemTop = $prevItem.addClass('selected').position().top;
							var offset = $dropdownList.position().top - $prevItem.innerHeight();

							if (itemTop < offset)
							{
								$dropdownList.scrollTop($dropdownList.scrollTop() + offset + itemTop);
							}
							return;
						}
					}

					$dropdownList.scrollTop($dropdownList.get(0).scrollHeight).children().last().addClass('selected');
				}
			}


			function pressDownArrow()
			{
				if (dropdownListVisible)
				{
					mouseLock = true;
					var $selectedItem = $dropdownList.find('.selected').first();

					if ($selectedItem.length)
					{
						$dropdownList.unselect();

						var $nextItem = $selectedItem.next();

						if ($nextItem.length)
						{
							var panelHeight = $dropdownList.outerHeight();
							var itemHeight = $nextItem.addClass('selected').innerHeight();
							var itemBottom = $nextItem.position().top + itemHeight;

							if (itemBottom > panelHeight)
							{
								$dropdownList.scrollTop($dropdownList.scrollTop() + itemHeight - $dropdownList.position().top - panelHeight + itemBottom);
							}
							return;
						}
					}

					$dropdownList.scrollTop(0).children().first().addClass('selected');
				}
				else
				{
					if ($dropdownList.children().length)
					{
						$dropdownList.show();
					}
				}
			}
		}); // end each
	};
}(jQuery));