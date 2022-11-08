import React from 'react';
import {FileButton, Group} from "@mantine/core";
import {IButtonGroup} from "@box/shared/ui/button_group/types";
import {Button} from "@box/shared";

export const ButtonGroup: React.FC<IButtonGroup> = ({
    buttons
                                                    }) => {
    return (
        <Group>
            {buttons.map((el, num) => {
                if (el.file) {
                    return (
                        <FileButton
                            key={num}
                            accept={el.file.accept}
                            onChange={(file) =>
                                file ? el.file?.onSelect(file, el.meta) : null
                            }
                        >
                            {(props) => (
                                <Button width={132} preset={"dark"} size={"xsm"} {...props}>
                                    {el.title}
                                </Button>
                            )}
                        </FileButton>
                    );
                }
                return (
                    <Button width={132} key={num} preset={"dark"} size={"xsm"} onClick={el.onClick}>
                       {el.title}
                    </Button>
                );
            })}
        </Group>
    );
};
