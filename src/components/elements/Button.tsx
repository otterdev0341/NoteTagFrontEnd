
import styled from "styled-components";

export enum ButtonType {
    Primary = "primary",
    Success = "success",
    Warning = "warning",
    Danger = "danger",
    }

    const BaseButton = styled.button({
        padding: "5px 10px",
        borderRadius: "5px",
        color: "#F9F9FF",
        cursor: "pointer",
    });
    
    const PrimaryButton = styled(BaseButton)({
        backgroundColor: "#6495ED",
    });
    
    const SuccessButton = styled(BaseButton)({
        backgroundColor: "#00FF00",
    });
    
    const WarningButton = styled(BaseButton)({
        backgroundColor: "#FFFF00",
    });
    
    const DangerButton = styled(BaseButton)({
        backgroundColor: "#FF0000",
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