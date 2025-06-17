const Header = (props) => <h2>{props.course}</h2>

const Content = (props) => (
    <div>
        {props.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
)

const Part = (props) => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
)

const Total = ({ parts }) => {
    const total = parts.reduce((sum, order) => sum + order.exercises, 0)
    console.log('total excercises: ', total);

    return <p>total of {total} exercises</p>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course