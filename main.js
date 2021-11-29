
const update = document.querySelector('#update-button')
update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
      distance: 0.073,
      accum: 16.8
    })
  })
})