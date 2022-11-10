import React from 'react';
import Input from "../../common/Input/Input";
import Checkbox from "../../common/Checkbox/Checkbox";
import Button from "../../common/Button/Button";
import css_btn from "../../common/Button/Button.module.css"

const TestComponents = () => {
    return (
        <div>
            <Input/>
            <Checkbox/>
            <Button className={css_btn.btn}>
                press me
            </Button>
        </div>
    );
};

export default TestComponents;