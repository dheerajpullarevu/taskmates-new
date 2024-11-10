import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:taskmates/providers/auth_provider.dart';
import 'package:taskmates/providers/profile_provider.dart';
import 'package:taskmates/widgets/loading_view.dart';
import 'package:taskmates/widgets/error_view.dart';
import 'package:taskmates/utils/formatters.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profileAsync = ref.watch(profileProvider);
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () {
              Navigator.pushNamed(context, '/profile/edit');
            },
          ),
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              Navigator.pushNamed(context, '/settings');
            },
          ),
        ],
      ),
      body: profileAsync.when(
        loading: () => const LoadingView(),
        error: (error, stack) => ErrorView(message: error.toString()),
        data: (profile) => SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeader(context, profile),
              const SizedBox(height: 24),
              _buildStats(context, profile),
              const SizedBox(height: 24),
              _buildWallet(context, profile),
              const SizedBox(height: 24),
              _buildSkills(context, profile),
              const SizedBox(height: 24),
              _buildTaskHistory(context, profile),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, UserProfile profile) {
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            CircleAvatar(
              radius: 48,
              backgroundImage: profile.avatar != null
                  ? NetworkImage(profile.avatar!)
                  : null,
              child: profile.avatar == null
                  ? const Icon(Icons.person, size: 48)
                  : null,
            ),
            const SizedBox(height: 16),
            Text(
              profile.name,
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              profile.email,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurface.withOpacity(0.6),
              ),
            ),
            const SizedBox(height: 16),
            Wrap(
              spacing: 8,
              children: profile.badges.map((badge) => Chip(
                avatar: Icon(
                  _getBadgeIcon(badge.type),
                  size: 16,
                  color: theme.colorScheme.primary,
                ),
                label: Text(badge.type.replaceAll('_', ' ').toUpperCase()),
                backgroundColor: theme.colorScheme.primary.withOpacity(0.1),
                labelStyle: TextStyle(
                  color: theme.colorScheme.primary,
                  fontSize: 12,
                ),
              )).toList(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStats(BuildContext context, UserProfile profile) {
    final theme = Theme.of(context);
    return Row(
      children: [
        Expanded(
          child: _buildStatCard(
            context,
            'Tasks Completed',
            profile.tasksCompleted.toString(),
            Icons.check_circle,
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: _buildStatCard(
            context,
            'Rating',
            '${profile.rating?.toStringAsFixed(1) ?? 'N/A'} ★',
            Icons.star,
          ),
        ),
      ],
    );
  }

  Widget _buildStatCard(
    BuildContext context,
    String label,
    String value,
    IconData icon,
  ) {
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Icon(icon, color: theme.colorScheme.primary),
            const SizedBox(height: 8),
            Text(
              value,
              style: theme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              label,
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurface.withOpacity(0.6),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildWallet(BuildContext context, UserProfile profile) {
    final theme = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Wallet Balance',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                TextButton(
                  onPressed: () {
                    // Navigate to wallet screen
                  },
                  child: const Text('View Details'),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              formatCurrency(profile.wallet.balance),
              style: theme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.bold,
                color: theme.colorScheme.primary,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSkills(BuildContext context, UserProfile profile) {
    if (profile.skills == null || profile.skills!.isEmpty) {
      return const SizedBox.shrink();
    }

    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Skills',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: profile.skills!.map((skill) => Chip(
            label: Text(skill),
            backgroundColor: theme.colorScheme.primary.withOpacity(0.1),
            labelStyle: TextStyle(color: theme.colorScheme.primary),
          )).toList(),
        ),
      ],
    );
  }

  Widget _buildTaskHistory(BuildContext context, UserProfile profile) {
    final theme = Theme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Recent Tasks',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            TextButton(
              onPressed: () {
                // Navigate to full task history
              },
              child: const Text('View All'),
            ),
          ],
        ),
        const SizedBox(height: 8),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: profile.workHistory.take(3).length,
          itemBuilder: (context, index) {
            final task = profile.workHistory[index];
            return Card(
              child: ListTile(
                title: Text(task.title),
                subtitle: Text(formatDate(task.completedAt)),
                trailing: task.rating != null
                    ? Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(task.rating!.toString()),
                          const Icon(Icons.star, size: 16),
                        ],
                      )
                    : null,
              ),
            );
          },
        ),
      ],
    );
  }

  IconData _getBadgeIcon(String type) {
    switch (type) {
      case 'top_rated':
        return Icons.star;
      case 'verified':
        return Icons.verified;
      case 'expert':
        return Icons.workspace_premium;
      case 'rising_star':
        return Icons.trending_up;
      default:
        return Icons.emoji_events;
    }
  }
}