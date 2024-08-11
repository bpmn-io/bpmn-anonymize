export function anonymizeReferences(references) {
  references.forEach(({ element }) => {
    if (element.name) {
      element.name = anonymize(element.$type);
    }
  });
}

export function anonymizeFlowElements(rootElement) {

  rootElement.rootElements.forEach(({ flowElements }) => {

    if (!flowElements) return;

    flowElements.forEach(({ name, $type: type }, i) => {
      if (name) {
        flowElements[i].name = anonymize(type);
      }
    });

  });
}

export function anonymizeCategoryValue(rootElement) {

  rootElement.rootElements.forEach(({ categoryValue, $type: type }) => {

    if (!categoryValue) return;

    categoryValue.forEach((_, i) => {
      categoryValue[i].value = anonymize(type);
    });

  });
}

export function anonymizeArtifacts(rootElement) {

  rootElement.rootElements.forEach(({ artifacts }) => {

    if (!artifacts) return;

    artifacts.forEach(({ text, $type: type }, i) => {
      if (text) {
        artifacts[i].text = anonymize(type);
      }
    });

  });
}

export function anonymizeParticipants(rootElement) {

  rootElement.rootElements.forEach(({ participants }) => {

    if (!participants) return;

    participants.forEach(({ name, $type: type }, i) => {
      if (name) {
        participants[i].name = anonymize(type);
      }
    });

  });
}

function anonymize(type) {
  if (type === 'bpmn:SequenceFlow') return '';
  const result = type.replace('bpmn:', '').replace(/([A-Z][a-z])/g,' $1').replace(/(\d)/g,' $1').trim();
  return result;
}