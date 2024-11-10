import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:taskmates/models/task.dart';
import 'package:taskmates/providers/task_provider.dart';
import 'package:taskmates/widgets/loading_view.dart';
import 'package:taskmates/widgets/error_view.dart';
import 'package:taskmates/utils/formatters.dart';
import 'package:taskmates/features/chat/chat_screen.dart';

class TaskDetailsScreen extends ConsumerWidget {
  final String taskId;

  const TaskDetailsScreen({super.key, required this.taskId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final taskAsync = ref.watch(taskProvider(taskId));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Task Details'),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () {
              // Implement share functionality
            },
          ),
        ],
      ),
      body: taskAsync.when(
        loading: () => const LoadingView(),
        error: (error, stack) => ErrorView(message: error.toString()),
        data: (task) => SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(context, task),
              const SizedBox(height: 24),
              _buildDescription(context, task),
              const SizedBox(height: 24),
              _buildDetails(context, task),
              const SizedBox(height: 24),
              _buildSkills(context, task),
              const SizedBox(height: 24),
              _buildLocation(context, task),
              const SizedBox(height: 32),
              _buildActionButtons(context, task),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, Task task) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          task.title,
          style: theme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: _getPriorityColor(task.priority).withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                task.priority.toUpperCase(),
                style: theme.textTheme.labelSmall?.copyWith(
                  color: _getPriorityColor(task.priority),
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: theme.colorScheme.primary.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                task.status.toUpperCase(),
                style: theme.textTheme.labelSmall?.copyWith(
                  color: theme.colorScheme.primary,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildDescription(BuildContext context, Task task) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Description',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          task.description,
          style: theme.textTheme.bodyMedium,
        ),
      ],
    );
  }

  Widget _buildDetails(BuildContext context, Task task) {
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            _buildDetailRow(
              context,
              Icons.attach_money,
              'Budget',
              formatCurrency(task.budget),
            ),
            const Divider(height: 24),
            _buildDetailRow(
              context,
              Icons.access_time,
              'Deadline',
              formatDate(task.deadline),
            ),
            const Divider(height: 24),
            _buildDetailRow(
              context,
              Icons.person,
              'Posted by',
              task.taskGiverId,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(
    BuildContext context,
    IconData icon,
    String label,
    String value,
  ) {
    final theme = Theme.of(context);
    return Row(
      children: [
        Icon(icon, size: 20, color: theme.colorScheme.primary),
        const SizedBox(width: 8),
        Text(
          label,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.primary,
          ),
        ),
        const Spacer(),
        Text(
          value,
          style: theme.textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }

  Widget _buildSkills(BuildContext context, Task task) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Required Skills',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: task.skills.map((skill) => Chip(
            label: Text(skill),
            backgroundColor: theme.colorScheme.primary.withOpacity(0.1),
            labelStyle: TextStyle(color: theme.colorScheme.primary),
          )).toList(),
        ),
      ],
    );
  }

  Widget _buildLocation(BuildContext context, Task task) {
    if (task.location == null) return const SizedBox.shrink();
    
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Location',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Card(
          child: ListTile(
            leading: Icon(Icons.location_on, color: theme.colorScheme.primary),
            title: Text(task.location!.address),
            trailing: IconButton(
              icon: const Icon(Icons.map),
              onPressed: () {
                // Open map
              },
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildActionButtons(BuildContext context, Task task) {
    return Column(
      children: [
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: task.status == 'open' ? () {
              // Apply for task
            } : null,
            child: const Text('Apply for Task'),
          ),
        ),
        const SizedBox(height: 8),
        SizedBox(
          width: double.infinity,
          child: OutlinedButton.icon(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ChatScreen(taskId: task.id),
                ),
              );
            },
            icon: const Icon(Icons.chat),
            label: const Text('Contact Task Giver'),
          ),
        ),
      ],
    );
  }

  Color _getPriorityColor(String priority) {
    switch (priority.toLowerCase()) {
      case 'urgent':
        return Colors.red;
      case 'high':
        return Colors.orange;
      case 'medium':
        return Colors.yellow.shade800;
      default:
        return Colors.green;
    }
  }
}