{`<template>
  <Page>
    <ActionBar title="TaskMates" />
    <TabView androidTabsPosition="bottom">
      <!-- Home Tab -->
      <TabViewItem title="Home" ios:iconSource="res://home" android:iconSource="res://ic_home">
        <GridLayout>
          <ScrollView>
            <StackLayout class="p-4">
              <Label text="Welcome to TaskMates" class="h1 text-center" />
              <Label text="Get things done with trusted professionals" class="body text-center" />
              
              <!-- Featured Categories -->
              <Label text="Popular Categories" class="h2 m-t-20" />
              <GridLayout columns="*, *" rows="auto, auto" class="m-t-10">
                <StackLayout col="0" row="0" class="category-card m-r-5">
                  <Label text="Delivery" class="category-title" />
                </StackLayout>
                <StackLayout col="1" row="0" class="category-card m-l-5">
                  <Label text="Home Services" class="category-title" />
                </StackLayout>
                <StackLayout col="0" row="1" class="category-card m-r-5 m-t-10">
                  <Label text="Professional" class="category-title" />
                </StackLayout>
                <StackLayout col="1" row="1" class="category-card m-l-5 m-t-10">
                  <Label text="Online Tasks" class="category-title" />
                </StackLayout>
              </GridLayout>

              <!-- Recent Tasks -->
              <Label text="Recent Tasks" class="h2 m-t-20" />
              <ListView for="task in recentTasks" class="list-group">
                <v-template>
                  <StackLayout class="list-group-item">
                    <Label :text="task.title" class="h3" />
                    <Label :text="task.description" class="body" textWrap="true" />
                    <GridLayout columns="auto, *, auto" class="m-t-5">
                      <Label col="0" :text="task.budget" class="price" />
                      <Label col="2" :text="task.status" class="status" />
                    </GridLayout>
                  </StackLayout>
                </v-template>
              </ListView>
            </StackLayout>
          </ScrollView>
        </GridLayout>
      </TabViewItem>

      <!-- Tasks Tab -->
      <TabViewItem title="Tasks" ios:iconSource="res://tasks" android:iconSource="res://ic_tasks">
        <GridLayout>
          <tasks-list />
        </GridLayout>
      </TabViewItem>

      <!-- Messages Tab -->
      <TabViewItem title="Messages" ios:iconSource="res://messages" android:iconSource="res://ic_messages">
        <GridLayout>
          <chat-list />
        </GridLayout>
      </TabViewItem>

      <!-- Profile Tab -->
      <TabViewItem title="Profile" ios:iconSource="res://profile" android:iconSource="res://ic_profile">
        <GridLayout>
          <profile-view />
        </GridLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import TasksList from './tasks/TasksList';
import ChatList from './chat/ChatList';
import ProfileView from './profile/ProfileView';

export default {
  components: {
    TasksList,
    ChatList,
    ProfileView
  },
  data() {
    return {
      recentTasks: [
        {
          title: 'Delivery Task',
          description: 'Need package delivered from point A to B',
          budget: '$50',
          status: 'Open'
        },
        {
          title: 'Web Development',
          description: 'Create a simple landing page',
          budget: '$200',
          status: 'Open'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.h1 {
  font-size: 24;
  font-weight: bold;
  margin-bottom: 10;
}

.h2 {
  font-size: 20;
  font-weight: bold;
  margin-bottom: 10;
}

.body {
  font-size: 16;
  color: #666666;
}

.category-card {
  background-color: #f0f0f0;
  border-radius: 10;
  padding: 20;
  height: 100;
}

.category-title {
  font-size: 18;
  font-weight: bold;
  text-align: center;
}

.list-group-item {
  padding: 15;
  background-color: white;
  border-bottom-width: 1;
  border-bottom-color: #eeeeee;
}

.price {
  color: #2196F3;
  font-weight: bold;
}

.status {
  background-color: #E3F2FD;
  color: #2196F3;
  padding: 5 10;
  border-radius: 15;
}
</style>`}