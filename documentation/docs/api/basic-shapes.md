In this part of api's specification, we're going to categorize according to the type of shape.

We consider Rectangle, Lozenge, Circle, Line, as basic shapes.
Each of this shape has some vertex and connection points.
Vertex are upper corners of the shape by which we can resize the shape.
The connection points are the middle of the shape by which we can create a link with another one.

Below we have the main attributes inside the table and main functions listed that all the shape have.

| Attributes's name                         | Description
| :-------------:                           |:-------------:|
| events                                    |   Dictionary object to record events and their respective callbacks associated with specific shape.
| nativeEvent                               | Default events made available by aya     |
| config                                    | Allows you to access the basic configurations of aya.    |
| c_svg                                     |      Represents the svg dom element created.    |
| svg                                       | SVG document in which the shape is drawn.     |
| type                                      | Type of the shape.    |
| svg                                       | svg document in which the shape is drawn     |
| children                                  |   A table listing all children of the shape.|
| offsetX                                   |      The offsetX represents the x-offset to be applied to the rectangle. To position it at {this. x + this.offsetX} on the x-axis.|
| offsetY                                   |      The offsetY represents the y-offset to be applied to the rectangle. To position it at {this. y + this.offsetX} on the y-axis.|
| scaleX                                    |       The ScaleX represents the scale to be applied to the size of the shape on the x-axis.|
| scaleY                                    |     The ScaleX represents the scale to be applied to the size of the shape on the x-axis.    |
| angle                                     |      This variable represents the value of the rotation angle to be applied to rotate the shape.     |
| centerX                                   |    The abscissa of the center of rotation is defined by defining centerX.   |
| centerY                                   |    The ordinate of the center of rotation is defined by defining centerY.   |
| c_points                                  |   The variable c_points represents all the connection points of the form. These are the points from which one can establish a link with other forms having also these connection points.    |
| vertex                                    |   The vertex variable represents the set of points from which we can resize the shape.  |


## addEvent(event, callback)

   * This method allows us to add an event to the shape.
   * We record the event and the associated callback for easy removal after.
   * @param { String } event - the event
   * @param { Function } callback - {} This callback is either defined by the user when
   * adding other custom events, or a callback already defined in event.js.

## deleteEvent(event)

   * This method allows us to delete a specific event passed as a string parameter.
   * @param { String } event - The event.

## addChild(child, translate = null, rotate = null, drawing = true)

   * We can build any shape by adding to a basic component a children shape.
   * @param { (Rectangle | Lozenge | Triangle | Circle | Line | Text) } child - This shape ( @extend Shape) is added as a child to a component.
   * @param { Function } translate - { parent, child } This function allows us to position the child relative to its parent.
   * @param {Function } rotate  - { parent, child } This function allows us to apply a rotation of the child taking into account its relative position and the center of rotation.


## draw()
* Draw the shape into the svg document.


## redraw()
* Redraw the shape into the svg document.

## removeFromDOM()

* Remove the shape from the DOM.

## drawVertex()

   * The drawVertex function simply calculates the position of each vertex according to the specificity of the shape.

## drawConnector()

   * The drawConnector function simply calculates the position of each connection point according to the specificity of the shape.

## setRotateCenter(centerX, centerY)

* Define the center of the rotation.

## setRotateAngle(angle)

* Define the angle of the rotation

## setOffsetX(x)

* Define the offsetX of the specific shape

## setOffsetY(y)

* Define the offsetY of the specific shape

## setScaleX(x)

* Define the scaleX of the specific shape


## setScaleY(y)

* return the scaleY of the specific shape


## getOffsetX(x)

* return the offsetX of the specific shape

## getOffsetY(y)

* return the offsetY of the specific shape

## getScaleX(x)

* return the scaleX of the specific shape


## getScaleY(y)

* return the scaleY of the specific shape

