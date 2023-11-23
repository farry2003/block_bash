import {BLOCK_BASH_backend} from "../../declarations/BLOCK_BASH_backend";


async function registerUser() {
  const identity = document.getElementById('userIdentity').value;
  try {
    const response = await BLOCK_BASH_backend.registerUser(identity);
    alert(response);
  } catch (error) {
    alert(`Error registering user: ${error}`);
  }
}

async function createBallot() {
  const title = document.getElementById('ballotTitle').value;
  const options = document.getElementById('ballotOptions').value;
  try {
    const ballotId = await BLOCK_BASH_backend.createBallot(title, options);
    alert(`New ballot created with ID: ${ballotId}`);
  } catch (error) {
    alert(`Error creating ballot: ${error}`);
  }
}

async function castVote() {
  const ballotId = parseInt(document.getElementById('ballotid').value);
  const title = document.getElementById('ballottitle').value;
  const options = document.getElementById('ballotOptions').value;
  try {
    const response = await BLOCK_BASH_backend.castVote(ballotId, title, options);
    alert(response);
  } catch (error) {
    alert(`Error casting vote: ${error}`);
  }
}

async function displayBallots() {
  const ballotList = document.getElementById('ballotList');
  const ballots = await BLOCK_BASH_backend.getBallots();

  ballotList.innerHTML = '';

  for (const ballot of ballots) {
    const li = document.createElement('li');
    li.textContent = `Ballot ID: ${ballot.id}, Title: ${ballot.title}, Options: ${ballot.options}, Votes: ${ballot.votes}`;
    ballotList.appendChild(li);
  }
}

document.getElementById('registerButton').addEventListener('click', function(event) {
  event.stopImmediatePropagation();
  registerUser();
});
document.getElementById('createBallotButton').addEventListener('click', function(event){
  event.stopImmediatePropagation();
  createBallot();
});
document.getElementById('castVoteButton').addEventListener('click', function(event){
  event.stopImmediatePropagation();
  castVote();
});
document.getElementById('getBallotsButton').addEventListener('click', function(event){
  event.stopImmediatePropagation();
  displayBallots();
});

 