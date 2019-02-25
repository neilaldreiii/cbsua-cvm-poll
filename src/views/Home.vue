<template>
    <div class="home">
      <div class="banner">
        <div class="title">
          <h1>Mr. and Ms. Veterinary Medicine 2019</h1>
          <p>4:00pm February 28, 2019 @SM Naga</p>
          <router-link to="/mrvetmedpoll">Vote Now</router-link>
        </div>
      </div>
      <div class="rules">
        <h1>Rules</h1>
        <ul>
          <li>
            Voters must connect to facebook before proceeding.
          </li>
          <li>
            Voters will get four(4) Maximum total votes. Two(2) for Mr. VetMed candidates and Two(2) for Ms. VetMed Candidates.
          </li>
          <li>
            Voters cannot vote for the same candidate twice.
          </li>
          <li>
            Voters cannot vote if their total votes reaches zero(0).
          </li>
          <li>
            Mr. and Ms. VetMed poll will end on <b>February 28, 2019 @12pm</b>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: "home",
};
</script>
