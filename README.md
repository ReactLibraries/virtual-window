# @react-libraries/virtual-window

## Description

VirtualWindow for React

## Image

![image](https://user-images.githubusercontent.com/54426986/106378682-07d79c80-63ea-11eb-8934-d0c150f5b340.gif)

## Example

```tsx
const SampleComponent = () => (
    <VirtualWindow title="Title" width={200} height={100}>
        Contents
    </VirtualWindow>
);
```

## Storybook

[Storybook samples](https://reactlibraries.github.io/virtual-window/captures/master/stories/?path=/docs/components-virtualwindow--primary)  

## \<VirtualWindow> parameters

| Name          | Type                           | Default                        | Description                                           |
| ------------- | ------------------------------ | ------------------------------ | ----------------------------------------------------- |
| title         | ReactNode                      | ""                             | Window title                                          |
| overlapped    | boolean                        | true                           | Whether to set position to fixed                      |
| titleEnable   | boolean                        | true                           | Whether to display the title                          |
| titleSize     | number                         | 32                             | Title bar size                                        |
| titleButtons  | {}                             | {max:true,min:true,close:true} | Presence or absence of a button attached to the title |
| active        | boolean                        | false                          | Whether to activate in the initial state              |
| baseX         | start \| center \| end         | start                          | Placement criteria in the X direction                 |
| baseY         | start \| center \| end         | start                          | Placement criteria in the Y direction                 |
| x             | number                         | 0                              | Initial X position                                    |
| y             | number                         | 0                              | Initial Y position                                    |
| width         | number                         | 640                            | Initial width                                         |
| height        | number                         | 480                            | Initial height                                        |
| state         | normal \| max \| min \| close  | normal                         | Window state                                          |
| frameSize     | number                         | 1                              | Frame size                                            |
| resize        | boolean                        | true                           | Whether to allow resizing                             |
| resizeBold    | number                         | 8                              | Invisible frame size for resizing                     |
| clientStyle   | React.CSSProperties            | undefined                      | Client style                                          |
| clientClass   | string                         | undefined                      | Client class name                                     |
| clientMovable | boolean                        | false                          | Whether the client can be dragged and dropped         |
| dispatch      | Ref                            | undefined                      | Dispatch for parameter setting                        |
| onUpdate      | (params: WindowParams) => void | undefined                      | State change event                                    |

## WindowParams

| Name   | Type                      | Description     |
| ------ | ------------------------- | --------------- |
| active | boolean                   | Window active   |
| x      | number                    | Current x       |
| y      | number                    | Current y       |
| width  | number                    | Current width   |
| height | number                    | Current height  |
| state  | normal \|max\|min \|close | Window state    |
| init   | boolean                   | Initial display |

## dispatch

`dispatch({type:"state", payload:'normal'|'max'|'min'|'close'});`  
`dispatch({type:"position", payload:{x:number,y:number}});`  
`dispatch({type:"size", payload:{width:number,height:number}});`  
