type DateDayProps = {
    day: string;
    dateHour: string;
}

export const DateDay = ({day, dateHour}: DateDayProps) =>{
    return (
        <div>
            <h3>{day}</h3>
            <span>{dateHour}</span>
        </div>
    )
}