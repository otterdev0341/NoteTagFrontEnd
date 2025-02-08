
import styled from "styled-components";

export enum ButtonType {
    Primary = "primary",
    Success = "success",
    Warning = "warning",
    Danger = "danger",
    }

const PrimaryButton = styled.button({
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "#6495ED",
    color: "#F9F9FF",
    cursor: "pointer",
});

const SuccessButton = styled.button({
    padding: "5px 10px",
    backgroundColor: "#00FF00",
    color: "#F9F9FF"
});

const WarningButton = styled.button({
    padding: "5px 10px",
    backgroundColor: "#FFFF00",
    color: "#F9F9FF"
});
const DangerButton = styled.button({
    padding: "5px 10px",
    backgroundColor: "#FF0000",
    color: "#F9F9FF"
});

interface ButtonProps {
    button_type: ButtonType;
    text: string;
    onClick?: () => void;
}

export default function CustomButton(buttonProps: ButtonProps){
    
    const {text, onClick} = buttonProps;
    
    switch(buttonProps.button_type){
        case ButtonType.Primary:
            return <PrimaryButton onClick={onClick}>{text}</PrimaryButton>;
        case ButtonType.Success:
            return <SuccessButton onClick={onClick}>{text}</SuccessButton>;
        case ButtonType.Warning:
            return <WarningButton onClick={onClick}>{text}</WarningButton>;
        case ButtonType.Danger:
            return <DangerButton onClick={onClick}>{text}</DangerButton>;
        default:
            return <button onClick={onClick}>{text}</button>;
    }

    
}