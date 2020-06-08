var smallestSufficientTeam = function(req_skills, people) {
  const skillMap = new Map();
  const reqMap = new Map()
  req_skills.forEach((a, index) => reqMap.set(a, index))
  const target = 2**req_skills.length -1;
  var result = [];
  people.forEach((a, index) => {
    let bits = a.reduce((x,y) => x + 2**reqMap.get(y), 0)
    skillMap.set(index, bits);
  })
  function recurse(current = [], currBits = 0, i= 0) {
    if (currBits == target) {
        result = [...current];
        return;
    }
    if (current.length + 1 >= result.length && result.length > 0) return;
    for (i; i <  people.length; i++) {
      if (!people[i].length) continue;
      let perBits = skillMap.get(i);
      //console.log(i, current, perBits);
      if (currBits | perBits !== currBits) {
        current.push(i);
        let prevBits = currBits;
        recurse(current, currBits | perBits, i+1);
        current.pop();
        currBits = prevBits;
      }
    }
  }
  recurse();
  return result; 
};

/**
 * Smallest Sufficient Team
 * In a project, you have a list of required skills req_skills, and a list of people.  The i-th person people[i] 
 * contains a list of skills that person has.
 * 
 * Consider a sufficient team: a set of people such that for every required skill in req_skills, there is at least 
 * one person in the team who has that skill.  We can represent these teams by the index of each person: for example, 
 * team = [0, 1, 3] represents the people with skills people[0], people[1], and people[3].
 * 
 * Return any sufficient team of the smallest possible size, represented by the index of each person.
 * 
 * You may return the answer in any order.  It is guaranteed an answer exists.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: req_skills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["nodejs","reactjs"]]
 * Output: [0,2]
 * Example 2:
 * 
 * Input: req_skills = ["algorithms","math","java","reactjs","csharp","aws"], 
 *   people = [["algorithms","math","java"],["algorithms","math","reactjs"],
 *   ["java","csharp","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]]
 * Output: [1,2]
 *  
 * 
 * Constraints:
 * 
 * 1 <= req_skills.length <= 16
 * 1 <= people.length <= 60
 * 1 <= people[i].length, req_skills[i].length, people[i][j].length <= 16
 * Elements of req_skills and people[i] are (respectively) distinct.
 * req_skills[i][j], people[i][j][k] are lowercase English letters.
 * Every skill in people[i] is a skill in req_skills.
 * It is guaranteed a sufficient team exists.
 * 
 * @param {string[]} req_skills
 * @param {string[][]} people
 * @return {number[]}
 */
