import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part key={index} part={part.name} exercises={part.exercises}></Part>
      ))}
    </div>
  );
};

export default Content;
