/**
 * Initialize your data structure here.
 */
var Twitter = function() {
  this._tweets = [];
  this._users = {}
};

/**
 * Compose a new tweet. 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    this._tweets.push(tweetId)
    if (!(userId in this._users)){
      this.newUser(userId,null,[this._tweets.length - 1, tweetId])
    } else {
      this._users[userId].posts.push([this._tweets.length -1, tweetId])
    }
};


/**
 * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent. 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
  if (!this._users[userId]) return [];
  let tweetList = [];
  this._users[userId].follows.forEach(a => {
    if (this._users[a] !== undefined) tweetList = [...tweetList,...this._users[a].posts]
  });
  tweetList.sort((a,b) => b[0]-a[0]);
  //console.log(tweetList);
  let result = tweetList.slice(0,10);
  return result.map(a => a[1]);
};

/**
 * Follower follows a followee. If the operation is invalid, it should be a no-op. 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    if (followerId in this._users){
      this._users[followerId].follows.add(followeeId);
    } else {
      this.newUser(followerId, followeeId)
    }
};

Twitter.prototype.newUser = function(userId, followeeId, tweet) {
      this._users[userId]= {}
      this._users[userId].follows  = new Set([userId]);
      if (followeeId !== null) this._users[userId].follows.add(followeeId);
      this._users[userId].posts = [];
      if (tweet !== undefined) this._users[userId].posts.push(tweet);
}
/**
 * Follower unfollows a followee. If the operation is invalid, it should be a no-op. 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    if (followerId in this._users && followerId !== followeeId) this._users[followerId].follows.delete(followeeId)
};

/** 
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 *  
 * Design Twitter
 * Design a simplified version of Twitter where users can post tweets, follow/unfollow another user and is able to see the 10 most recent tweets in the user's news feed. Your design should support the following methods:
 * 
 * postTweet(userId, tweetId): Compose a new tweet.
 * getNewsFeed(userId): Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.
 * follow(followerId, followeeId): Follower follows a followee.
 * unfollow(followerId, followeeId): Follower unfollows a followee.
 * Example:
 * 
 * Twitter twitter = new Twitter();
 * 
 * // User 1 posts a new tweet (id = 5).
 * twitter.postTweet(1, 5);
 * 
 * // User 1's news feed should return a list with 1 tweet id -> [5].
 * twitter.getNewsFeed(1);
 * 
 * // User 1 follows user 2.
 * twitter.follow(1, 2);
 * 
 * // User 2 posts a new tweet (id = 6).
 * twitter.postTweet(2, 6);
 * 
 * // User 1's news feed should return a list with 2 tweet ids -> [6, 5].
 * // Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
 * twitter.getNewsFeed(1);
 * 
 * // User 1 unfollows user 2.
 * twitter.unfollow(1, 2);
 * 
 * // User 1's news feed should return a list with 1 tweet id -> [5],
 * // since user 1 is no longer following user 2.
 * twitter.getNewsFeed(1);
 */
 
 
