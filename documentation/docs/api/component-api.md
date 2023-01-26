
The Component function of Init class allow us to instanciate a the Component class based on the type and the props as parameters.


Below, we talk about some attributes that is important.
## aya.Component(type, props)

<b>Specification : </b>  The Component class is strategic.
With this, the default events designed by aya is applicated and activated unlike to the simple shape instanciated without the component class where events is applicated but does'nt work because simple shapes aren't registered by default in aya except the Point class.
To addtion, with a component we can build complex one by adding a children to it.


| Attributes's name             | Description
| :-------------:               |:-------------:|
| type                         | Type of component, useful in order to instanciate the appropriate shape. |
| form                        | The appropriate form based on type provided, which is instanciated by calling a factory method.     |
