import EmptyWithIcon from "@/components/EmptyWithIcon";
import Layout from "@/layouts/MainLayout";
import { usePage } from "@inertiajs/react";
import { Accordion, Box, Breadcrumbs, Center, Stack, Text, Title, rem } from "@mantine/core";
import { IconRocket, IconStar, IconStarFilled } from "@tabler/icons-react";
import Task from "./Task";
import classes from "./css/Index.module.css";

const TasksIndex = () => {
  let { projects } = usePage().props;

  projects = projects.filter((i) => i.tasks.length);

  let opened = projects.filter((i) => i.favorite).map((i) => i.id.toString());

  if (opened.length === 0) {
    opened = projects[0]?.id.toString() || "";
  }

  return (
    <>
      <Breadcrumbs fz={14} mb={30}>
        <div>Mi trabajo</div>
        <div>Tareas</div>
      </Breadcrumbs>

      <Title order={1} mb={20}>
      Tareas asignadas a usted
      </Title>

      <Box maw={1000}>
        {projects.length ? (
          <Accordion variant="separated" radius="md" multiple defaultValue={opened}>
            {projects.map((project) => (
              <Accordion.Item
                key={project.id}
                value={project.id.toString()}
                className={classes.accordionControl}
              >
                <Accordion.Control
                  icon={
                    project.favorite ? (
                      <IconStarFilled
                        style={{
                          color: "var(--mantine-color-yellow-4)",
                          width: rem(20),
                          height: rem(20),
                        }}
                      />
                    ) : (
                      <IconStar
                        style={{
                          width: rem(20),
                          height: rem(20),
                        }}
                      />
                    )
                  }
                >
                  <Text fz={20} fw={600}>
                    {project.name}
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap={8}>
                    {project.tasks.map((task) => (
                      <Task key={task.id} task={task} />
                    ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <Center mih={300}>
            <EmptyWithIcon
              title="¡Todos atrapados!"
              subtitle="No tasks assigned at the moment"
              icon={IconRocket}
            />
          </Center>
        )}
      </Box>
    </>
  );
};

TasksIndex.layout = (page) => <Layout title="My Tasks">{page}</Layout>;

export default TasksIndex;
