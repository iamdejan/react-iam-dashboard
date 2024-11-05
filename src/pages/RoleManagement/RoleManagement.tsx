import { Box, Loader, Paper, Title } from "@mantine/core";
import { JSX } from "react";
import { MRT_ColumnDef, MRT_Table, useMantineReactTable } from "mantine-react-table";
import Role from "../../types/Role";
import { useRoles } from "../../services/queries";

export default function RoleManagement(): JSX.Element {
  const rolesQuery = useRoles();

  const columns: Array<MRT_ColumnDef<Role>> = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "team",
      header: "Team",
    },
    {
      accessorFn: (role: Role) => role.toString(),
      header: "Role",
    },
  ];

  const fetchedRoles = rolesQuery.data ?? [];

  const table = useMantineReactTable({
    columns,
    data: fetchedRoles,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineTableProps: {
      highlightOnHover: true,
      withColumnBorders: true,
      withRowBorders: true,
      striped: false
    },
  });

  return (
    <Box>
      <Title order={1}>Role Management</Title>

      {rolesQuery.isLoading &&
        <Box
          display="flex"
          style={{
            width: "100%",
            height: "80vh",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Loader />
        </Box>
      }

      {rolesQuery.isFetched &&
        <Paper mt="1rem">
          <MRT_Table table={table} />
        </Paper>
      }
    </Box>
  );
}
