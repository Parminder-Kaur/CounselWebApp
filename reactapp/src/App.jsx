import { useState } from "react";
export default function Welcome() {
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('CounselAPI', {
            method: 'POST',
            mode: 'cors',
            redirect: "follow",
            headers: {
                'Content-Type': 'application/json; charset= UTF-8',
                Accept: 'application/json',
            },
            body: JSON.stringify(
                {
                "MeasureId": randomNumberInRange(1, 1000),
                "MeasureName": name,
                "MeasureSubject": subject,
                "MeasureDescription": description,
                "MeasureStatus": "Open",
                "MeasureResults": "TBD"
                })
        });  
    }

   
    return (
        <>
            <label>Create Measure</label>
            <form onSubmit={handleSubmit} method="post">
                <label>Measure name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>Measure Subject:
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </label>
                <label>Measure Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <input type="submit" />
            </form>
        </>
    );
}