

interface Project {
  name: string;
  description: string;
  imageUrl: string;
}



export default function Projects() {

  const projects : Project[] = [];
  projects.push({
    name: "/imageUrl/Project1Image.png"
  } as Project)

  return <div>
    <h1>Checkout the projects I have been working on!</h1>
    <ul>
      {
      projects.map(project => <li>{ProjectCard(project)}</li>)
      }</ul>
    </div>
}


export function ProjectCard(project : Project) {
  return <div>
    <h2><b>{project.name}</b></h2>
    <p>{project.description}</p>
    <p>{project.imageUrl}</p>
  </div>
}