import { useState } from "react";

// A Form component that's designed to be extended to reduce code overhead
const Searchbar = (props) => {
    let [text, setText] = useState("");

    function handleOnChange(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault(); // stops page from reloading
        props.onSubmit(text); // call the onSubmit function passed in through props with this component's text as a parameter
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Form:
                <input type="text" onChange={handleOnChange} />
            </label>
        </form>
    );
}

export default Searchbar;