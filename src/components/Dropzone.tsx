"use client"
import React, { useState } from "react";
import styles from "@/css/Dropzone.module.css";

type State = {
    inDropZone: Boolean;
    files: FileList | File[];
}

const DropZone = ({ data, dispatch, name }: { data: State, dispatch: any, name: string }) => {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    // onDragEnter sets inDropZone to true
    const handleDragEnter = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
    };

    // onDragLeave sets inDropZone to false
    const handleDragLeave = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    };

    // onDragOver sets inDropZone to true
    const handleDragOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        // set dropEffect to copy i.e copy of the source item
        e.dataTransfer.dropEffect = "copy";
        dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
    };

    // onDrop sets inDropZone to false and adds files to fileList
    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        // get files from event on the dataTransfer object as an array
        let files = [...e.dataTransfer.files];

        // ensure a file or files are dropped
        if (files && files.length > 0) {
            // loop over existing files

            const fileReader = new FileReader;
            fileReader.onload = function() {
                setPreview(fileReader.result);
            }
            fileReader.readAsDataURL(files[0])

            // dispatch action to add droped file or files to fileList
            dispatch({ type: "ADD_FILE_TO_LIST", files });
            // reset inDropZone to false
            dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
        }
    };

    // handle file selection via input element
    const handleFileSelect = (e: any) => {
        // get files from event on the input element as an array
        let files = [...e.target.files];

        // ensure a file or files are selected
        if (files && files.length > 0) {

            const fileReader = new FileReader;
            fileReader.onload = function() {
                setPreview(fileReader.result);
            }
            fileReader.readAsDataURL(files[0])

            // dispatch action to add selected file or files to fileList
            dispatch({ type: "ADD_FILE_TO_LIST", files });
        }
    };

    const emptyFiles = () => {
        setPreview(null)
        dispatch({ type: "EMPTY_FILE_LIST" })
    }

    return (
        <>
            {!preview &&
                <div
                    className={styles.dropzone}
                    onDrop={(e) => handleDrop(e)}
                    onDragOver={(e) => handleDragOver(e)}
                    onDragEnter={(e) => handleDragEnter(e)}
                    onDragLeave={(e) => handleDragLeave(e)}
                >

                    <input
                        id={`fileSelect${name}`}
                        type="file"
                        accept="image/jpeg,image/png"
                        className={styles.files}
                        onChange={(e) => handleFileSelect(e)}
                    />
                    <label htmlFor={`fileSelect${name}`}>Select {name}</label>

                    <h3 className={styles.uploadMessage}>
                        or drag &amp; drop your picture here
                    </h3>
                </div>
            }
            {preview &&
                <div className={styles.previewContainer}>
                    <div className={styles.preview}>
                        <img className={styles.previewImg} src={preview as string} />
                    </div>
                    <button className={styles.previewBtn} onClick={emptyFiles}>Remove</button>
                </div>
            }
        </>
    );
};

export default DropZone;
