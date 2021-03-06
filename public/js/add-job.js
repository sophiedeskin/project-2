const addjobFormHandler = async (event) => {
    event.preventDefault();
  
    const job_title = document.querySelector('#title').value.trim();
    const job_company = document.querySelector('#company').value.trim();
    const job_description = document.querySelector('#description').value.trim();
    const job_salary = document.querySelector('#salary').value.trim();
    const job_technologies = document.querySelector('#technology').value.trim();
    const job_contact = document.querySelector('#contact').value.trim();
    const date_created = document.querySelector('#date').value.trim();
  
  
      const response = await fetch('/api/jobs', {
        method: 'POST',
        body: JSON.stringify({ job_title, job_company, job_description, job_salary, job_technologies, job_contact, date_created }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to add post.');

      }
    };
    document.querySelector('#create-post').addEventListener('click', addjobFormHandler);