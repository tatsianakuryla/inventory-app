import { type JSX, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { LoadingErrorEmptySwitcher } from '../../components/Tables/LoadingErrorEmptySwitcher/LoadingErrorEmptySwitcher';
import { UsersTable } from '../../components/AdminUsersPageComponents/Tables/UsersTable/UsersTable';
import { UsersToolbar } from '../../components/AdminUsersPageComponents/Tables/UsersTable/UsersToolbar';
import {
  useGetUsers,
  useBlockUsers,
  useUnblockUsers,
  usePromoteUsers,
  useDemoteUsers,
  useDeleteUsers,
} from '../../hooks/admin/useAdminUsers';
import { type SortableUserKeys } from '../../api/AdminService/admin.schemas';
import { container } from './admin-page.styles';
import { useUserStore } from '../../stores/useUserStore';
import { AuthService } from '../../api/AuthService/AuthService';
import { APP_ROUTES } from '../../appRouter/routes/routes';

export const AdminPage = (): JSX.Element => {
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortableUserKeys>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const query = useGetUsers({
    sortBy: sortKey,
    order: sortOrder,
  });

  const blockMutation = useBlockUsers();
  const unblockMutation = useUnblockUsers();
  const promoteMutation = usePromoteUsers();
  const demoteMutation = useDemoteUsers();
  const deleteMutation = useDeleteUsers();

  const handleLogoutAndRedirect = async (): Promise<void> => {
    await AuthService.logout();
    logout({ redirect: true });
  };

  const sortedUsers = useMemo(() => {
    if (!query.data?.users) return [];
    return [...query.data.users];
  }, [query.data?.users]);

  const handleSort = useCallback(
    (key: SortableUserKeys): void => {
      if (sortKey === key) {
        setSortOrder((previous) => (previous === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortOrder('asc');
      }
    },
    [sortKey]
  );

  const getSelectedUsersWithVersion = (): { id: string; version: number }[] => {
    return sortedUsers
      .filter((user) => selectedIds.has(user.id))
      .map((user) => ({ id: user.id, version: user.version }));
  };

  const handleBlock = async (): Promise<void> => {
    if (selectedIds.size === 0) return;
    const currentUserId = currentUser?.id;

    const response = await blockMutation.mutateAsync(getSelectedUsersWithVersion());
    setSelectedIds(new Set());

    if (currentUserId && response.updatedIds.includes(currentUserId)) {
      await handleLogoutAndRedirect();
    }
  };

  const handleUnblock = async (): Promise<void> => {
    if (selectedIds.size === 0) return;
    await unblockMutation.mutateAsync(getSelectedUsersWithVersion());
    setSelectedIds(new Set());
  };

  const handlePromote = async (): Promise<void> => {
    if (selectedIds.size === 0) return;
    await promoteMutation.mutateAsync(getSelectedUsersWithVersion());
    setSelectedIds(new Set());
  };

  const handleDemote = async (): Promise<void> => {
    if (selectedIds.size === 0) return;
    const currentUserId = currentUser?.id;

    const response = await demoteMutation.mutateAsync(getSelectedUsersWithVersion());
    setSelectedIds(new Set());

    if (currentUserId && response.updatedIds.includes(currentUserId)) {
      void navigate(APP_ROUTES.HOME);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (selectedIds.size === 0) return;
    const currentUserId = currentUser?.id;
    const requestedIds = [...selectedIds];

    const response = await deleteMutation.mutateAsync({ ids: requestedIds });
    setSelectedIds(new Set());

    const wasDeleted =
      currentUserId &&
      requestedIds.includes(currentUserId) &&
      !response.skippedIds.includes(currentUserId);

    if (wasDeleted) {
      await handleLogoutAndRedirect();
    }
  };

  const handleClearSelection = (): void => {
    setSelectedIds(new Set());
  };

  const handleSelectAll = useCallback(
    (checked: boolean): void => {
      if (checked && sortedUsers) {
        setSelectedIds(new Set(sortedUsers.map((user) => user.id)));
      } else {
        setSelectedIds(new Set());
      }
    },
    [sortedUsers]
  );

  const handleSelectOne = useCallback((id: string, checked: boolean): void => {
    setSelectedIds((previous) => {
      const newSet = new Set(previous);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  }, []);

  const isAllSelected =
    sortedUsers && selectedIds.size === sortedUsers.length && sortedUsers.length > 0;

  return (
    <>
      <PageHeader title="Admin Management Panel" />
      <LoadingErrorEmptySwitcher
        isLoading={query.isLoading}
        error={query.error}
        data={query.data}
        emptyText="No users found"
        errorTitle="Failed to load users"
      >
        <div className={container}>
          <UsersToolbar
            selectedCount={selectedIds.size}
            onBlock={(): void => {
              void handleBlock();
            }}
            onUnblock={(): void => {
              void handleUnblock();
            }}
            onPromote={(): void => {
              void handlePromote();
            }}
            onDemote={(): void => {
              void handleDemote();
            }}
            onDelete={(): void => {
              void handleDelete();
            }}
            onClearSelection={handleClearSelection}
            isBlocking={blockMutation.isPending}
            isUnblocking={unblockMutation.isPending}
            isPromoting={promoteMutation.isPending}
            isDemoting={demoteMutation.isPending}
            isDeleting={deleteMutation.isPending}
          />

          {query.data?.users && (
            <UsersTable
              users={sortedUsers}
              sortKey={sortKey}
              sortOrder={sortOrder}
              onSort={handleSort}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              isAllSelected={isAllSelected}
            />
          )}
        </div>
      </LoadingErrorEmptySwitcher>
    </>
  );
};
