import Array "mo:base/Array";


actor VotingSystem {
  type List<T> = ?(T, List<T>);
  type Ballot = {
    id: Nat;
    title: Text;
    options: Text;
    votes: Nat;
  };

  type User = {
    identity: Text;
    hasVoted: Bool;
  };

  var ballots : [Ballot] = [];
  var users : [User] = [];

  

  public func registerUser(identity: Text) : async Text {
    let newUser : User = { identity = identity; hasVoted = false };
    let updatedUsers = Array.append(users, [newUser]);
    users := updatedUsers;
    "User Has Been Registered For Voting";
  };

  public func createBallot(title: Text, options: Text, ) : async Nat {
    let ballotId = Array.size(ballots);
    let newBallot : Ballot = {
      id = ballotId;
      title = title;
      options = options;
      votes = 0;
    };
    ballots := Array.append(ballots, [newBallot]);
    return ballotId;
  };

  public func castVote(ballotId: Nat, title: Text, options: Text) : async Text {
    if (ballotId >= Array.size(ballots)) {
       return "Ballot does not exist.";
    };
    let new : Ballot = {
      id = ballotId;
      title = title;
      options = options;
      votes = 1;
    };
    ballots := Array.append(ballots, [new]);
    let message = "Vote Casted Succesfully for " # options;
    return message;
  };

  public func getBallots() : async [Ballot] {
    ballots;
  };
};