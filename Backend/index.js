const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dbn21dt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const PostCollection = client.db("Post_Hub").collection("Post_Data");
    const ProfileDataCollection = client.db("Post_Hub").collection("Profiles");

    // send data
    app.post("/post-data", async (req, res) => {
      try {
        const postData = req.body;

        postData.likeCount = 0;
        postData.loveCount = 0;
        postData.likedBy = [];
        postData.lovedBy = [];
        postData.comments = [];
        const result = await PostCollection.insertOne(postData);
        res.status(200).json({
          success: true,
          message: "Post created successfully",
          result,
        });
      } catch (error) {
        console.error("Error inserting post data:", error);
        res.status(500).json({ success: false, message: error.message });
      }
    });

    //  get data
    app.get("/datas", async (req, res) => {
      const result = await PostCollection.find().toArray();
      res.send(result);
    });

    // update data
    app.patch("/update-post/reaction", async (req, res) => {
      try {
        const { email, createdAt, reaction, reactorEmail, reactorName } =
          req.body;
        const filter = { email: email, createdAt: createdAt };

        const post = await PostCollection.findOne(filter);
        if (!post) {
          return res
            .status(404)
            .json({ success: false, message: "Post not found" });
        }

        let update;
        if (reaction === "like") {
          if (
            post.likedBy &&
            post.likedBy.some((item) => item.reactorEmail === reactorEmail)
          ) {
            return res.status(400).json({
              success: false,
              message: "User already liked this post",
            });
          }
          update = {
            $push: { likedBy: { reactorEmail, reactorName } },
          };
        } else if (reaction === "love") {
          if (
            post.lovedBy &&
            post.lovedBy.some((item) => item.reactorEmail === reactorEmail)
          ) {
            return res.status(400).json({
              success: false,
              message: "User already loved this post",
            });
          }
          update = {
            $push: { lovedBy: { reactorEmail, reactorName } },
          };
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Invalid reaction type" });
        }

        // Update the post
        await PostCollection.updateOne(filter, update);

        const updatedPost = await PostCollection.findOne(filter);
        const likeCount =
          (updatedPost.likedBy && updatedPost.likedBy.length) || 0;
        const loveCount =
          (updatedPost.lovedBy && updatedPost.lovedBy.length) || 0;

        await PostCollection.updateOne(filter, {
          $set: { likeCount, loveCount },
        });

        const finalPost = await PostCollection.findOne(filter);
        res.status(200).json({
          success: true,
          message: "Reaction updated",
          post: finalPost,
        });
      } catch (error) {
        console.error("Error updating reaction:", error);
        res.status(500).json({ success: false, message: error.message });
      }
    });

    // update data
    app.post("/update-post/comment", async (req, res) => {
      try {
        const { email, createdAt, comment } = req.body;
        if (!comment || !comment.text || !comment.userName) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid comment data" });
        }
        const filter = { email: email, createdAt: createdAt };

        const result = await PostCollection.updateOne(filter, {
          $push: { comments: comment },
        });
        if (result.modifiedCount === 0) {
          return res.status(404).json({
            success: false,
            message: "Post not found or comment not added",
          });
        }
        const updatedPost = await PostCollection.findOne(filter);
        res
          .status(200)
          .json({ success: true, message: "Comment added", post: updatedPost });
      } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ success: false, message: error.message });
      }
    });

    app.get("/profile/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const profile = await ProfileDataCollection.findOne({ email: email });
        if (!profile) {
          return res.status(200).json({
            profile: {
              displayName: "",
              email: email,
              mobile: "",
              university: "",
              address: "",
            },
          });
        }
        res.status(200).json({ profile });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // PATCH data
    app.patch("/profile/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const updatedData = req.body;
        // Use upsert: true to create a new document if one doesn't exist.
        await ProfileDataCollection.updateOne(
          { email: email },
          { $set: updatedData },
          { upsert: true }
        );
        const updatedProfile = await ProfileDataCollection.findOne({
          email: email,
        });
        res.status(200).json({ profile: updatedProfile });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // find top post by like or love
    app.get("/top-posts", async (req, res) => {
      try {
        const posts = await PostCollection.find()
          .sort({ loveCount: -1 })
          .limit(3)
          .toArray();
        res.status(200).json({ posts });
      } catch (error) {
        console.error("Error fetching top posts:", error);
        res.status(500).json({ message: error.message });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
