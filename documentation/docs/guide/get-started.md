# Getting Started

<p>
    This section will help you build a basic aya component from ground up.
</p>


## Step. 1: create a new html file 
First of all, you need to create a index.html file.
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
<script type="application/javascript"  src="https://cdn.jsdelivr.net/npm/ayajs@1.0.1/build/aya.js"></script>
```
<p> So your file will look like this</p>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="application/javascript"  src="https://cdn.jsdelivr.net/npm/ayajs@1.0.1/build/aya.js"></script>
    <title>aya demo</title>
</head>
<body>
    
</body>
</html>
```

## Step. 4: initialize aya
 You need to create a script inside the body element and instanciate aya by calling the Init class like that:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="application/javascript"  src="https://cdn.jsdelivr.net/npm/ayajs@1.0.1/build/aya.js"></script>
    <title>aya demo</title>
</head>
<body>
    <script>
        var aya = new aya.Init();
    </script>
</body>
</html>
```

## Step. 5: create some basic rectangle component
 You need to call the constructor of the class Component and pass it the type of the component and the corresponding attributes.
 In this example, we have created a rectangle component whose shape is 200 wide and 100 high and is positioned at (100, 100).

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="application/javascript"  src="https://cdn.jsdelivr.net/npm/ayajs@1.0.1/build/aya.js"></script>
    <title>aya demo</title>
</head>
<body>
    <script>
        var aya = new aya.Init();

        var rect = aya.Component("rectangle", {x: 100, y: 100, width: 200, height: 100});    
    </script>
</body>
</html>
```


## Step. 6: add aya's svg document into the body

Once you have create a component and draw it into the svg, you need to add this svg inside the body element like this :

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
    <script type="application/javascript"  src="https://cdn.jsdelivr.net/npm/ayajs@1.0.1/build/aya.js"></script>
    <title>aya demo</title>
</head>
<body>
    <script>
        var aya = new aya.Init();

        var rect = aya.Component("rectangle", {x: 100, y: 100, width: 200, height: 100}); 
        document.body.append(aya.svg);
    </script>
</body>
</html>
```

You can now see your html file in the browser.