interface Button {
    color: string
    text: string
}

export default function Button(props: Button) {
    let className = ['button'];

    if(props.color === 'secondary') {

        className.push("secondary-color")
    }
    return (<button class={className.join(" ")}>{props.text}</button>)
  }