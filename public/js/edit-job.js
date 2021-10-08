async function editFormHandler(event) {
    event.preventDefault();
    console.log("clicked")
    console.log(event.target)
    
    
    
    const job_title = document.querySelector('input[name="job_title"]').value;
    const job_company = document.querySelector('input[name="job_company"]').value;
    const job_description = document.querySelector('input[name="job_description"]').value;
    const job_salary = document.querySelector('input[name="job_salary"]').value;
    const job_technologies = document.querySelector('input[name="job_technologies"]').value;
    const date_created = document.querySelector('input[name="date_created"]').value;
    const job_contact = document.querySelector('input[name="job_contact"]').value;
    
    
    const id = event.target.id
    await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
        body: JSON.stringify({
            job_title, job_company, job_description, job_salary, job_technologies, job_contact, date_created
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
        document.location.replace('/myjobspage');
    }
  document.querySelector('#create-post').addEventListener('click', editFormHandler);