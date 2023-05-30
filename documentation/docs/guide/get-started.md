# Getting Started

<p>
    This section will help you build a basic aya component from ground up.
</p>


## Step. 1: create a new html file 
First of all, you need to create an index.html file.
Call it whatever you want.

```sh
$ touch index.html
```

## Step. 2: populate this file with this code

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>aya demo</title>
</head>
<body>
    
</body>
</html>
```

## Step. 3: include aya by copying this cdn link into head element

```js
<script type="application/javascript"  src="https://cdn.jsdelivr.net/npm/ayajs@2.0.7/build/aya.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ayajs@2.0.7/build/style.css">

```
<p> So your file will look like this</p>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="application/javascript"  src="https://cdn.jsdelivr.net/npm/ayajs@2.0.7/build/aya.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ayajs@2.0.7/build/style.css">
    <title>aya demo</title>
</head>
<body>
    
</body>
</html>
```

## Step. 4: initialize aya
 You need to create a script inside the body element and instanciate aya by calling the init method like that:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="application/javascript"  src="https://cdn.jsdelivr.net/npm/ayajs@2.0.7/build/aya.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ayajs@2.0.7/build/style.css">
    <title>aya demo</title>
</head>
<body>
    <script>
        var aya = aya.init();
    </script>
</body>
</html>
```

## Step. 5: create a basic rectangle component
 You need to call the rectangle method.
 In this example, we have created a rectangle component whose shape is 200  wide and 100 high and is positioned at (100, 100).

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="application/javascript"  src="https://cdn.jsdelivr.net/npm/ayajs@2.0.7/build/aya.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ayajs@2.0.7/build/style.css">
    <title>aya demo</title>
</head>
<body>
    <script>
        var aya = aya.init();

        var rect = aya.rectangle(100, 100, 200, 100);    
    </script>
</body>
</html>
```


## Step. 6: add aya's svg document into the body

Once you have created a component and drawn it automaticaly inside the svg, you need to add this svg inside the body element like this :

```js
document.body.append(aya.svg);
```

So the complete code looks like that:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="application/javascript"  src="https://cdn.jsdelivr.net/npm/ayajs@2.0.7/build/aya.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ayajs@2.0.7/build/style.css">
    <title>aya demo</title>
</head>
<body>
    <script>
        var aya = aya.init();

        var rect = aya.rectangle(100, 100, 200, 100); 
        document.body.append(aya.svg);
    </script>
</body>
</html>
```

You can now open your html file in the browser.