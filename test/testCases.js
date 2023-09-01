const request = require('supertest');
const { expect } = require('chai');
const config = require('../env.js');
const TOKEN = config.token;
const url = config.baseUrl;

let userId, userName, userEmail, postId, postTitle, commentId, todoId;

//POST API TESTING

describe("Positive - Post New User", () => { 
    it("Response status equal to 201", async () => {
      const response = await request(url)
        .post(`/public/v2/users?access-token=${TOKEN}`)
        .send({
          "email": "jihan@mail.com",
          "name": "Jihan Farah",
          "gender": "female",
          "status": "active"
        });

      userId = response.body.id;
      userName =  response.body.name;
      userEmail =  response.body.email;
      console.log('User ID:', userId);
      console.log('User Name:', userName);
      console.log('User Email:', userEmail);
      expect(response.status).to.equal(201);
    });
});

describe("Positive - Post New Posts", () => { 
    it("Response status equal to 201", async () => {
      const response = await request(url)
        .post(`/public/v2/posts?access-token=${TOKEN}`)
        .send({
          "user": userName,
          "user_id":userId,
          "title":"Post test",
          "body":"Ini uji coba post"
           });
  
        postId = response.body.id;
        postTitle = response.body.title;
        console.log('Post ID:', postId);
        console.log('Post Title:', postTitle);
        expect(response.status).to.equal(201);
      });
  });
  
describe("Positive - Post New Comments", () => { 
    it("Response status equal to 201", async () => {
      const response = await request(url)
        .post(`/public/v2/comments?access-token=${TOKEN}`)
        .send({
          "post": postTitle,
          "post_id":postId,
          "name":userName,
          "email": userEmail,
          "body": "Contoh komen"
           });
  
        commentId = response.body.id;
        console.log('Comment ID:', commentId);
        expect(response.status).to.equal(201);
      });
  });

describe("Positive - Post New To-dos", () => { 
    it("Response status equal to 201", async () => {
      const response = await request(url)
        .post(`/public/v2/todos?access-token=${TOKEN}`)
        .send({
          "user": userName,
          "title":"To-do",
          "user_id":userId,
          "status":"completed"
           });
  
        todoId = response.body.id;
        console.log('To-do ID:', todoId);
        expect(response.status).to.equal(201);
      });
  }); 
 
describe("Negative - Post Duplicate Users", () => { 
  it("Response status equal to 422", async () => {
    const response = await request(url)
      .post(`/public/v2/users?access-token=${TOKEN}`)
      .send({
        "email": "jihan@mail.com",
        "name": "Jihan Farah",
        "gender": "female",
        "status": "active"
      });

       expect(response.status).to.equal(422);
  });
});

describe("Negative - Post New User with Empty Email", () => { 
  it("Response status equal to 422", async () => {
    const response = await request(url)
      .post(`/public/v2/users?access-token=${TOKEN}`)
      .send({
        "email": "",
        "name": "Jihan",
        "gender": "female",
        "status": "active"
      });
    expect(response.status).to.equal(422);
  });
});

describe("Negative - Post New User with Empty Name", () => { 
  it("Response status equal to 422", async () => {
    const response = await request(url)
      .post(`/public/v2/users?access-token=${TOKEN}`)
      .send({
        "email": "jihan@mail.com",
        "name": "",
        "gender": "female",
        "status": "active"
      });
    expect(response.status).to.equal(422);
  });
});

describe("Negative - Post New User with Empty gender", () => { 
  it("Response status equal to 422", async () => {
    const response = await request(url)
      .post(`/public/v2/users?access-token=${TOKEN}`)
      .send({
        "email": "jihan@mail.com",
        "name": "Jihan",
        "gender": "",
        "status": "active"
      });
    expect(response.status).to.equal(422);
  });
});

describe("Negative - Post New User with Empty status", () => { 
  it("Response status equal to 422", async () => {
    const response = await request(url)
      .post(`/public/v2/users?access-token=${TOKEN}`)
      .send({
        "email": "jihan@mail.com",
        "name": "Jihan",
        "gender": "female",
        "status": ""
      });
    expect(response.status).to.equal(422);
  });
});

describe("Negative - Post New User with Invalid Email", () => { 
  it("Response status equal to 422", async () => {
    const response = await request(url)
      .post(`/public/v2/users?access-token=${TOKEN}`)
      .send({
        "email": "tes",
        "name": "User 1",
        "gender": "female",
        "status": "active"
      });
    expect(response.status).to.equal(422);
  });
});

describe("Negative - Post New User with Invalid Gender", () => { 
  it("Response status equal to 422", async () => {
    const response = await request(url)
      .post(`/public/v2/users?access-token=${TOKEN}`)
      .send({
        "email": "user1@mail.com",
        "name": "User 1",
        "gender": "1",
        "status": "active"
      });
    expect(response.status).to.equal(422);
  });
});

describe("Negative - Post New User with Invalid Status", () => { 
  it("Response status equal to 422", async () => {
    const response = await request(url)
      .post(`/public/v2/users?access-token=${TOKEN}`)
      .send({
        "email": "user1@mail.com",
        "name": "User 1",
        "gender": "female",
        "status": "1"
      });
    expect(response.status).to.equal(422);
  });
});

// GET API TESTING

describe("Positive - GET all user details", () =>{

  it("Response status equal to 200", async () => {
    const response = await request(url)
      .get(`/public/v2/users?access-token=${TOKEN}`)
      expect(response.status).to.equal(200)
      })
})

describe("Positive - GET selected user details", () =>{  
    it("Response status equal to 200", async () => {
        const response = await request(url)
      .get(`/public/v2/users/${userId}?access-token=${TOKEN}`)
        expect(response.status).to.equal(200)
        })
    
  it("Response ID  equal to user's ID", async () => {
        const response = await request(url)
        .get(`/public/v2/users/${userId}?access-token=${TOKEN}`)
        expect(response.body.id).to.equal(userId)
      })     

   it("Response email equal to user's email", async () => {
          const response = await request(url)
        .get(`/public/v2/users/${userId}?access-token=${TOKEN}`)
        expect(response.body.email).to.equal(userEmail)
      })

      it("Response name equal to user's name", async () => {
        const response = await request(url)
      .get(`/public/v2/users/${userId}?access-token=${TOKEN}`)
      expect(response.body.name).to.equal(userName)
    })
  })

  describe("Positive - GET all posts details", () =>{

    it("Response status equal to 200", async () => {
      const response = await request(url)
        .get(`/public/v2/posts?access-token=${TOKEN}`)
        expect(response.status).to.equal(200)
        })
  })

  describe("Positive - GET selected post details", () =>{  
    it("Response status equal to 200", async () => {
        const response = await request(url)
      .get(`/public/v2/posts/${postId}?access-token=${TOKEN}`)
        expect(response.status).to.equal(200)
        })
  })

  describe("Positive - GET all comments details", () =>{

    it("Response status equal to 200", async () => {
      const response = await request(url)
        .get(`/public/v2/comments?access-token=${TOKEN}`)
        expect(response.status).to.equal(200)
        })
  })

  describe("Positive - GET selected comments details", () =>{  
    it("Response status equal to 200", async () => {
        const response = await request(url)
      .get(`/public/v2/comments/${commentId}?access-token=${TOKEN}`)
        expect(response.status).to.equal(200)
        })
  })

  describe("Positive - GET all to-dos details", () =>{

    it("Response status equal to 200", async () => {
      const response = await request(url)
        .get(`/public/v2/todos?access-token=${TOKEN}`)
        expect(response.status).to.equal(200)
        })
  })

  describe("Positive - GET selected to-dos details", () =>{  
    it("Response status equal to 200", async () => {
        const response = await request(url)
      .get(`/public/v2/todos/${todoId}?access-token=${TOKEN}`)
        expect(response.status).to.equal(200)
        })
  })

  describe("Negative - GET non-existed user detail", () =>{
    it("Response status equal to 404", async () => {
        const response = await request(url)
        .get(`/public/v2/users/12345?access-token=${TOKEN}`)
        expect(response.status).to.equal(404)
        })
  })

// PUT API TESTING

  describe("Positive - PUT selected user details", () =>{
    it("Response status equal to 200", async () => {
      const response = await request(url)
        .put(`/public/v2/users/${userId}?access-token=${TOKEN}`)
        .send({
          "email": "jihan@mail.com",
          "name": "User 1",
          "gender": "female",
          "status": "inactive"
      });
        expect(response.status).to.equal(200)
        })
  })

  describe("Negative - PUT not existed user", () =>{
    it("Response status equal to 404", async () => {
      const response = await request(url)
        .put(`/public/v2/users/123456?access-token=${TOKEN}`)
        .send({
          "email": "user1@mail.com",
          "name": "User 1",
          "gender": "female",
          "status": "inactive"
      });
        expect(response.status).to.equal(404)
        })
  })

  describe("Negative - Put Invalid Posts ID", () => { 
    it("Response status equal to 404", async () => {
      const response = await request(url)
        .post(`/public/v2/posts/123456?access-token=${TOKEN}`)
        .send({
          "user": userName,
          "user_id":userId,
          "title":"Post test",
          "body":"Halo. Saya adalah user"
           });
  
        expect(response.status).to.equal(404);
      });
  });

// DELETE API TESTING

  describe("Positive - Delete selected to-do", () =>{
    it("Response status equal to 204", async () => {
        const response = await request(url)
        .delete(`/public/v2/todos/${todoId}?access-token=${TOKEN}`)
        expect(response.status).to.equal(204)
        })
  })

  describe("Positive - Delete selected comments", () =>{
    it("Response status equal to 204", async () => {
        const response = await request(url)
        .delete(`/public/v2/comments/${commentId}?access-token=${TOKEN}`)
        expect(response.status).to.equal(204)
        })
  })

  describe("Positive - Delete selected post", () =>{
    it("Response status equal to 204", async () => {
        const response = await request(url)
        .delete(`/public/v2/posts/${postId}?access-token=${TOKEN}`)
        expect(response.status).to.equal(204)
        })
  })

  describe("Positive - Delete selected user", () =>{
    it("Response status equal to 204", async () => {
        const response = await request(url)
        .delete(`/public/v2/users/${userId}?access-token=${TOKEN}`)
        expect(response.status).to.equal(204)
        })
  })

  describe("Negative - DELETE not existed user", () =>{
    it("Response status equal to 404", async () => {
      const response = await request(url)
        .delete(`/public/v2/users/123456?access-token=${TOKEN}`)
        ;
        expect(response.status).to.equal(404)
        })
      })

describe("Negative - DELETE not existed user", () =>{
     it("Response status equal to 404", async () => {
        const response = await request(url)
          .delete(`/public/v2/users/123456?access-token=${TOKEN}`)
           ;
          expect(response.status).to.equal(404)
          })
        })

        describe("Negative - DELETE not existed user", () =>{
  it("Response status equal to 404", async () => {
    const response = await request(url)
    .delete(`/public/v2/users/123456?access-token=${TOKEN}`)
    ;
    expect(response.status).to.equal(404)
    })
  })

  describe("Negative - DELETE not existed user", () =>{
  it("Response status equal to 404", async () => {
    const response = await request(url)
     .delete(`/public/v2/users/123456?access-token=${TOKEN}`)
     ;
     expect(response.status).to.equal(404)
     })
    })