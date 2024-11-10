import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:taskmates/features/tasks/task_card.dart';
import 'package:taskmates/features/tasks/task_filter.dart';
import 'package:taskmates/providers/task_provider.dart';
import 'package:taskmates/widgets/error_view.dart';
import 'package:taskmates/widgets/loading_view.dart';

class TaskListScreen extends ConsumerWidget {
  const TaskListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final tasksAsync = ref.watch(tasksProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Available Tasks'),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {
              showModalBottomSheet(
                context: context,
                builder: (context) => const TaskFilter(),
              );
            },
          ),
        ],
      ),
      body: tasksAsync.when(
        loading: () => const LoadingView(),
        error: (error, stack) => ErrorView(message: error.toString()),
        data: (tasks) => tasks.isEmpty
            ? Center(
                child: Text(
                  'No tasks found',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
              )
            : ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: tasks.length,
                itemBuilder: (context, index) => TaskCard(task: tasks[index]),
              ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.pushNamed(context, '/tasks/create');
        },
        icon: const Icon(Icons.add),
        label: const Text('Create Task'),
      ),
    );
  }
}