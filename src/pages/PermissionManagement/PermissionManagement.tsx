import { Box, Button, Loader, Paper, Select, TextInput, Title } from "@mantine/core";
import { JSX } from "react";
import { usePermissions } from "../../services/queries";
import Permission from "../../types/Permission";
import { MRT_ColumnDef, MRT_Table, useMantineReactTable } from "mantine-react-table";
import Team from "../../types/Team";
import { CreatePermission, CreatePermissionSchema } from "../../schema/CreatePermissionSchema";
import { useForm, zodResolver } from "@mantine/form";
import { ulid } from "ulid";
import { useCreatePermission } from "../../services/mutations";

export default function PermissionManagement(): JSX.Element {
  const permissionsQuery = usePermissions();
  const createPermissionMutation = useCreatePermission();

  const columns: Array<MRT_ColumnDef<Permission>> = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "team",
      header: "Team",
    },
    {
      accessorFn: (permission: Permission) => permission.toString(),
      header: "Permission",
    },
  ];

  const fetchedPermissions = permissionsQuery.data ?? [];

  const table = useMantineReactTable({
    columns,
    data: fetchedPermissions,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineTableProps: {
      highlightOnHover: true,
      withColumnBorders: true,
      withRowBorders: true,
      striped: false,
    },
  });

  const { onSubmit, key, getInputProps } = useForm<CreatePermission>({
    mode: "uncontrolled",
    validate: zodResolver(CreatePermissionSchema),
  });

  function handleCreatePermission(createPermission: CreatePermission): void {
    const id = ulid();
    const team: Team = Team[createPermission.team as keyof typeof Team];
    const role = new Permission(id, team, createPermission.entity, createPermission.action);
    createPermissionMutation.mutate(role);
  }

  return (
    <Box>
      <Title order={1}>Permission Management</Title>
      <Paper
        p="2rem"
        mt="1rem"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          style={{
            width: "60%",
          }}
          onSubmit={onSubmit(handleCreatePermission)}
        >
          <Title order={3} mb="1rem">
            Create Permission
          </Title>
          <Select
            label="Team"
            placeholder="Team"
            data={Object.keys(Team)}
            key={key("team")}
            {...getInputProps("team")}
          />
          <TextInput
            label="Entity"
            placeholder="Entity"
            name="entity"
            key={key("entity")}
            {...getInputProps("entity")}
          />
          <TextInput
            label="Action"
            placeholder="Action"
            name="action"
            key={key("action")}
            {...getInputProps("action")}
          />

          <Button
            type="submit"
            mt="1rem"
          >
            Create Permission
          </Button>
        </form>
      </Paper>

      {permissionsQuery.isLoading && (
        <Box
          style={{
            display: "flex",
            width: "100%",
            height: "40vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader id="loader" />
        </Box>
      )}

      {permissionsQuery.isFetched && (
        <Paper mt="1rem">
          <MRT_Table table={table} />
        </Paper>
      )}
    </Box>
  );
}
