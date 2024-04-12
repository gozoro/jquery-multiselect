# jquery-multiselect
A jQuery plugin multiselect with checkboxes.





## Installation
```code
	composer require gozoro/jquery-multiselect
```

## Usage
-----


```html
	<div style="width:400px">
	<select id="countries" name="countries" multiple placeholder="Select countries">
		<option value="110">Austria</option>
		<option value="111">Belarus</option>
		<option value="112">Bulgaria</option>
		<option value="113">China</option>
		<option value="114">Finland</option>
		<option value="115">France</option>
		<option value="116">Germany</option>
		<option value="117">Greece</option>
		<option value="118">Italy</option>
		<option value="119">Poland</option>
		<option value="120">Russia</option>
		<option value="121">Spain</option>
	</select>
	</div>

	<script>
		$(document).ready(function()
		{
			$("#countries").multiselect();
		});
	</script>';
```

| ![Example](https://raw.githubusercontent.com/gozoro/jquery-multiselect/main/images/multiselect.gif) |
|-|

**Using with options**

```html

	<script>
		$(document).ready(function()
		{
			$("#countries").multiselect({selectedText:'Selected countries:', selectedTextMax:4});
		});
	</script>';
```


**Using with Bootstrap 3**

```html
	<div style="width:400px">
	<select id="countries" name="countries" multiple placeholder="Select countries" class="form-control">
		<option value="110">Austria</option>
		<option value="111">Belarus</option>
		<option value="112">Bulgaria</option>
		<option value="113">China</option>
		<option value="114">Finland</option>
		<option value="115">France</option>
		<option value="116">Germany</option>
		<option value="117">Greece</option>
		<option value="118">Italy</option>
		<option value="119">Poland</option>
		<option value="120">Russia</option>
		<option value="121">Spain</option>
	</select>
	</div>

	<script>
		$(document).ready(function()
		{
			$("#countries").multiselect({selectedText:'Selected countries:', selectedTextMax:4, caretClass:'glyphicon glyphicon-menu-down'});
		});
	</script>';
```

| ![Example](https://raw.githubusercontent.com/gozoro/jquery-multiselect/main/images/multiselect_with_bootstrap.gif) |
|-|

**Using with events**

```html
	<script>
		$(document).ready(function()
		{
			$("#countries").multiselect({selectedText:'Selected countries:', caretClass:'glyphicon glyphicon-menu-down'});

			$("#countries").change(function()
			{
				console.log('change');
			});

		});
	</script>';
```



## Options

- **selectedTextMax:**
The maximum number of items that are output explicitly. Default value: 3.

- **selectedText:**
Text to display the number of selected items when the selected items are greater than `selectedTextMax`. Default value: `Selected:`.

- **caretClass:**
CSS class for the caret inside the control. Example: `{caretClass:'glyphicon glyphicon-menu-down'}`.

## Keybindings

- `Escape` - close dropdown list.
- `Enter` - Open dropdown list and checked selected item.
- `Arrow Up` - moves selection to up.
- `Arrow Down` - moves selection to down.
- `Tab` - default behavior.