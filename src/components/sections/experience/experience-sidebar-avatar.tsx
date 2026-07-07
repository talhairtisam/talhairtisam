"use client";

import { useEnhancementAtLeast } from "@/context/enhancement-context";
import { usePointerOptional } from "@/context/pointer-context";
import { HumanoidCharacter } from "@/components/avatar/humanoid-character";

export function ExperienceSidebarAvatar() {
  const heavy = useEnhancementAtLeast("heavy");
  const pointer = usePointerOptional();

  return (
    <div className="mt-8 flex min-h-[200px] items-center justify-center">
      {heavy ? (
        <div className="scale-[2.4] opacity-0 transition-opacity duration-300 [animation:fade-in_0.4s_ease-out_forwards]">
          <HumanoidCharacter
            accent="var(--accent-violet)"
            lookX={pointer?.enabled ? pointer.lookX : undefined}
            lookY={pointer?.enabled ? pointer.lookY : undefined}
            leftArmRotate={-18}
            rightArmRotate={22}
          />
        </div>
      ) : (
        <div className="h-[104px] w-[78px] rounded-full border border-dashed border-border/60" aria-hidden />
      )}
    </div>
  );
}
