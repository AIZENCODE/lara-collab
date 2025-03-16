import TableRowActions from "@/components/TableRowActions";
import { getInitials } from "@/utils/user";
import { Link } from "@inertiajs/react";
import { Avatar, Badge, Group, Table, Text } from "@mantine/core";

export default function TableRow({ item }) {
  return (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar src={item.avatar} size={40} radius={40} color="blue" alt={item.name}>
            {getInitials(item.name)}
          </Avatar>
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.job_title}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.email}</Text>
        <Text fz="xs" c="dimmed">
          Email
        </Text>
      </Table.Td>
      <Table.Td>
        <Group gap="sm">
          {item.companies.map((item) => (
            <Link href={route("clients.companies.edit", item.id)} key={item.id}>
              <Badge variant="light" color="grape" tt="unset">
                {item.name}
              </Badge>
            </Link>
          ))}
        </Group>
      </Table.Td>
      {(can("edit client user") || can("archive client user") || can("restore client user")) && (
        <Table.Td>
          <TableRowActions
            item={item}
            editRoute="clients.users.edit"
            editPermission="edit client user"
            archivePermission="archive client user"
            restorePermission="restore client user"
            archive={{
              route: "clients.users.destroy",
              title: "Archive client",
              content: `¿Seguro que desea archivar este cliente? Esta acción impedirá que el cliente inicie sesión, pero el resto de sus acciones no se verán afectadas.`,
              confirmLabel: "Archive",
            }}
            restore={{
              route: "clients.users.restore",
              title: "Restore client",
              content: `¿Seguro que desea restaurar este cliente? Esta acción le permitirá iniciar sesión.`,
              confirmLabel: "Restore",
            }}
          />
        </Table.Td>
      )}
    </Table.Tr>
  );
}
