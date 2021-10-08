// const jobid = document.querySelector(#)
const deleteClickHandler = async function(event) {
  console.log("clicked")
  console.log(event.target)
  const id = event.target.id
    await fetch(`/api/jobs/${id}`, {
      method: 'DELETE'
    });
  
    document.location.replace('/dashboard');
  };

  var cards = document.querySelectorAll('.delete');
  for (i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', deleteClickHandler)
  }
