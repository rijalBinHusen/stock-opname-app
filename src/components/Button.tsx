interface Button {
    color: string
    text: string
    onClick?: Function
}

export default function Button(props: Button) {
    let className = ['button'];

    if(props.color === 'secondary') {

        className.push("secondary-color")
    }
    return (<button onClick={ () => props.onClick && props.onClick() } class={className.join(" ")}>{props.text}</button>)
  }