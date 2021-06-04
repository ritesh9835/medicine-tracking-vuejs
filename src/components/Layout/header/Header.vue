<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="container">
      <router-link to="/" class="navbar-brand">Medicine Tracker </router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/medicines" class="nav-link">
            <i class="fa fa-medkit"></i>
            Medicines
          </router-link>
        </li>
        
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
};
</script>
