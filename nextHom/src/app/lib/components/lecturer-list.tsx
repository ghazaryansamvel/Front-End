import Link from "next/link";
import { ILecture } from "../api";

interface IProps {
    lecturers: ILecture[]
}

export const LectureList = ({ lecturers }: IProps) => {
    return <>
        <div className="columns">
            {
                lecturers.map(l => {
                    return <div key={l.id} className="column">
                        <p>{l.name}</p>
                        <p>{l.surname}</p>
                        <p>{l.salary}</p>
                        <Link href={"/lecturers/edit/" + l.id}>Edit</Link>
                    </div>
                })
            }
        </div>
    </>
}