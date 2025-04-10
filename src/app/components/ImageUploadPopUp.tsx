import React from "react"

function ImageUploadPopUp(props: { trigger: any; children: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; })
{
    return(props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={()=>props.trigger(false)}>close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default ImageUploadPopUp