export  default function UnderwayCard(props){

    return (
        <>
        <div>
            <h3>{props.routeName}</h3>
            <div>
                <div>{props.description}</div>
                <div>{props.startDate}</div>
                <div>{props.location}</div>
                <div>{props.duration}</div>
            </div> 
        </div>
        </>
    );
}

