{`<template>
  <GridLayout rows="auto, *">
    <!-- Search and Filter Bar -->
    <GridLayout row="0" columns="*, auto" class="search-bar p-10">
      <SearchBar col="0" hint="Search tasks..." v-model="searchQuery" />
      <Button col="1" text="Filter" @tap="showFilters" class="filter-btn" />
    </GridLayout>

    <!-- Tasks List -->
    <ListView row="1" for="task in filteredTasks" @itemTap="onTaskTap" class="task-list">
      <v-template>
        <StackLayout class="task-item p-10">
          <Label :text="task.title" class="title" />
          <Label :text="task.description" class="description" textWrap="true" />
          <GridLayout columns="auto, *, auto" class="details">
            <Label col="0" :text="'$' + task.budget" class="budget" />
            <Label col="2" :text="task.status" :class="'status status-' + task.status.toLowerCase()" />
          </GridLayout>
          <GridLayout columns="auto, auto" class="meta">
            <Label col="0" :text="task.location" class="location" />
            <Label col="1" :text="task.deadline" class="deadline" />
          </GridLayout>
        </StackLayout>
      </v-template>
    </ListView>

    <!-- FAB for creating new task -->
    <FAB text="+" @tap="createTask" class="fab-button" />
  </GridLayout>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      tasks: [
        {
          id: '1',
          title: 'Delivery Task',
          description: 'Need package delivered from point A to B',
          budget: 50,
          status: 'Open',
          location: 'San Francisco',
          deadline: '2024-03-20'
        }
      ]
    }
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => 
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    showFilters() {
      // Show filter modal
    },
    onTaskTap(event) {
      const task = this.tasks[event.index];
      // Navigate to task details
    },
    createTask() {
      // Navigate to create task page
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  background-color: white;
  border-bottom-width: 1;
  border-bottom-color: #eeeeee;
}

.filter-btn {
  margin-left: 10;
  background-color: transparent;
  border-width: 1;
  border-color: #2196F3;
  color: #2196F3;
  border-radius: 5;
}

.task-item {
  background-color: white;
  border-bottom-width: 1;
  border-bottom-color: #eeeeee;
}

.title {
  font-size: 18;
  font-weight: bold;
  margin-bottom: 5;
}

.description {
  font-size: 14;
  color: #666666;
  margin-bottom: 10;
}

.budget {
  color: #2196F3;
  font-weight: bold;
}

.status {
  padding: 5 10;
  border-radius: 15;
  font-size: 12;
  
  &-open {
    background-color: #E3F2FD;
    color: #2196F3;
  }
  
  &-in_progress {
    background-color: #FFF3E0;
    color: #FF9800;
  }
  
  &-completed {
    background-color: #E8F5E9;
    color: #4CAF50;
  }
}

.meta {
  margin-top: 5;
  font-size: 12;
  color: #999999;
}

.fab-button {
  margin: 15;
  background-color: #2196F3;
  color: white;
  horizontal-align: right;
  vertical-align: bottom;
}
</style>`}