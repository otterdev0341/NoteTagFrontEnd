import "./eachtag.css";

interface EachTagProps {
    tag: string;
    onClick?: () => void;
    
}

export default function EachTag(props: EachTagProps){
    


    return (
        <button className="tag-container" onClick={props.onClick }>
            {props.tag.toString()}
        </button>
    );
}