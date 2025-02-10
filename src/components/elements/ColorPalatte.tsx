import "./colorpalatte.css";

interface ColorPalatteProps {
    isSelected: boolean;
    color: string;
    appendColor: (color: string) => void;
}

export default function colorPalatte({color, appendColor, isSelected}: ColorPalatteProps) {

    return(
        <>
            <div className={`circle-palatte ${isSelected ? "selected-color": ""}`} style={{backgroundColor: color}} onClick={() => appendColor(color)}>

            </div>
        </>
    );
}