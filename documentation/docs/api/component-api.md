
The Component function of Init class allow us to instanciate a the Component class based on the type and the props as parameters.


Below, we talk about some attributes that is important.
## aya.Component(type, props)

<b>Specification : </b>  The Component class is strategic.
With this, the default events designed by aya is applicated and activated unlike to the simple shape instanciated without the component class where events is applicated but does'nt work because simple shapes aren't registered by default in aya except the Point class.
To addtion, with a component we can build complex one by adding a children to it.


| Attributes's name             | Description
| :-------------:               |:-------------:|
| uuid                         |  Id of the component |
| type                         | Type of component, useful in order to instanciate the appropriate shape. |
| shape                        | The appropriate form based on type provided, which is instanciated by calling a factory method.     |

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