async function editFormHandler(event) {
    event.preventDefault();
  
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

    
    const job_title = document.querySelector('input[name="job_title"]').value;
    const job_company = document.querySelector('input[name="job_company"]').value;
    const job_description = document.querySelector('input[name="job_description"]').value;
    const job_salary = document.querySelector('input[name="job_salary"]').value;
    const job_technologies = document.querySelector('input[name="job_technologies"]').value;
    const job_contact = document.querySelector('input[name="job_contact"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

      await fetch(`/api/jobs/${id}`, {
      method: 'PUT',
        body: JSON.stringify({
            job_title, job_company, job_description, job_salary, job_technologies, job_contact
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/myjobspage');
      } else {
        alert(response.statusText);
      }
  }
}
  document.querySelector('#create-post').addEventListener('click', editFormHandler);