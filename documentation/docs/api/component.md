In this part of api's specification, we're going to categorize according to the type of shape.

We consider that rectangle, lozenge, circle, line as basic shapes derived from the same components.
Each of this shape has some vertex and connection points.
Vertex are upper corners of the shape by which we can resize the shape.
The connection points are the middle of the shape by which we can create a link with another one.

Below we have the main attributes inside the table and main functions listed that all the shape have.

| Attributes's name                         | Description
| :-------------:                           |:-------------:|
| uuid                                      |  Id of the component |
| type                                      | Type of component or shape, useful in order to draw the appropriate shape. |
| events                                    |   Dictionary object to record events and their respective callbacks associated with specific shape.
| config                                    | Allows you to access the basic configurations of aya.    |
| c_svg                                     |      Represents the svg dom element created.    |
| svg                                       | SVG document in which the shape is drawn.     |
| children                                  |   A table listing all component's children.|
| offsetX                                   |      The offsetX represents the x-offset to be applied to the rectangle. To position it at {this. x + this.offsetX} on the x-axis.|
| offsetY                                   |      The offsetY represents the y-offset to be applied to the rectangle. To position it at {this. y + this.offsetX} on the y-axis.|
| scaleX                                    |       The ScaleX represents the scale to be applied to the size of the shape on the x-axis.|
| scaleY                                    |     The ScaleX represents the scale to be applied to the size of the shape on the x-axis.    |
| angle                                     |      This variable represents the value of the rotation angle to be applied to rotate the shape.     |
| centerX                                   |    The abscissa of the center of rotation is defined by defining centerX.   |
| centerY                                   |    The ordinate of the center of rotation is defined by defining centerY.   |
| c_points                                  |   The variable c_points represents all the connection points of the form. These are the points from which one can establish a link with other forms having also these connection points.    |
| vertex                                    |   The vertex variable represents the set of points from which we can resize the shape.  |



## move(dx, dy)

   * We can build any shape by adding to a basic component a children shape.
   * @param { Number } dx -  dx represents the value added to the abscissa.
   * @param { Number } dy  -  dy represents the value added to the ordinate.



## addChild(child, translate = null, rotate = null, drawing = true)

   * We can build any shape by adding to a basic component a children shape.
   * @param { (Rectangle | Lozenge | Triangle | Circle | Line | Text) } child - This shape ( @extend Shape) is added as a child to a component.
   * @param { Object } translate - { x, y } This object allows us to position the child relative to its parent.
   * @param {Object } rotate  - { x, y } This object allows us to define the center of rotation.


## remove()

   * We can remove any component by calling this method.
   It removes the shape from the dom and deletes it from the register.


## addEvent(event, callback)

   * This method allows us to add an event to the shape.
   * We record the event and the associated callback for easy removal after.
   * @param { String } event - the event
   * @param { Function } callback - {} This callback is either defined by the user when
   * adding other custom events, or a callback already defined in event.js.

## deleteEvent(event)

   * This method allows us to delete a specific event passed as a string parameter.
   * @param { String } event - The event.

## deleteAllEvents()

   * This method allows us to delete all the events defined on the shape.

## draw()
* Draw the shape into the svg document.


## redraw()
* Redraw the shape into the svg document.

## removeFromDOM()

* Remove the shape from the DOM.

## drawVertex()

   * Use to calculate the position of each vertex according to the specificity of the shape.

## drawConnector()

   * Use to calculate the position of each connection point according to the specificity of the shape.