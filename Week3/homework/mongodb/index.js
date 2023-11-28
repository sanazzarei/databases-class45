const { MongoClient, ServerApiVersion } = require("mongodb");
const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  const episodesCollection = client.db().collection("episodes");
  const result = await episodesCollection.insertOne({
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN",
      "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"
    ]
  });

  console.log(
    `Created season 9 episode 13 and the document got the id ${"TODO: fill in variable here"}`
  );
}

async function findEpisodesExercises(client) {
    const episodesCollection = client.db().collection("episodes");

  const episode2Season2 = await episodesCollection.findOne({ episode: "S02E02" });
  console.log(
    `The title of episode 2 in season 2 is ${"TODO: fill in variable here"}`
  );

  const blackRiverEpisode = await episodesCollection.findOne({ title: "BLACK RIVER" });
  console.log(`The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.episode}`);

  const cliffEpisodes = await episodesCollection.find({ elements: "CLIFF" }).toArray();
  const cliffTitles = cliffEpisodes.map((episode) => episode.title);
  console.log(`The episodes that Bob Ross painted a CLIFF are ${cliffTitles.join(", ")}`);

  const cliffAndLighthouseEpisodes = await episodesCollection.find({
    elements: { $all: ["CLIFF", "LIGHTHOUSE"] }}).toArray();
  const cliffAndLighthouseTitles = cliffAndLighthouseEpisodes.map((episode) => episode.title);
  console.log(`The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseTitles.join(", ")}`);

}

async function updateEpisodeExercises(client) {
  const episodesCollection = client.db().collection("episodes");

  const updatedTitle = await episodesCollection.updateOne(
    { episode: "S30E13" },
    { $set: { title: "BLUE RIDGE FALLS" } }
  );
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updatedTitle.modifiedCount} episodes`
  );
  const updatedBushesToBush = await episodesCollection.updateMany(
    { elements: "BUSHES" },
    { $set: { "elements.$": "BUSH" } }
  );
  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updatedBushesToBush.modifiedCount} episodes`
  );
}


async function deleteEpisodeExercise(client) {
 const episodesCollection = client.db().collection("episodes");
 const deleteResult = await episodesCollection.deleteOne({ episode: "S31E14" });

  console.log(
    `Ran a command to delete episode and it deleted ${"TODO: fill in variable here"} episodes`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
