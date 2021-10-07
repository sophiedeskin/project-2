const addjobFormHandler = async (event) => {
    event.preventDefault();
  
    const job_title = document.querySelector('#title').value.trim();
    const job_company = document.querySelector('#content').value.trim();
    const job_description = document.querySelector('#content').value.trim();
    const job_salary = document.querySelector('#content').value.trim();
    const job_technologies = document.querySelector('#content').value.trim();
    const job_contact = document.querySelector('#content').value.trim();
  
  
      const response = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({ job_title, job_company, job_description, job_salary, job_technologies, job_contact }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert('Failed to add post.');

      }
    };
    document.querySelector('#create-post').addEventListener('click', addjobFormHandler);